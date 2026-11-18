import { spawnSync } from "node:child_process"
import { existsSync } from "node:fs"
import { mkdir, readdir, readFile, unlink, writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = fileURLToPath(new URL("../", import.meta.url))
const sourceRoot = join(projectRoot, "resources/react/src")
const config = JSON.parse(await readFile(join(projectRoot, "components.json"), "utf8"))
const uiAlias = config.aliases.ui
const uiRoot = resolve(sourceRoot, uiAlias.replace(/^@\//, ""))
const [command = "info", ...args] = process.argv.slice(2)

// Present the CLI with its standard layout, then restore the project's folder convention.
const components = (await readdir(uiRoot, { withFileTypes: true }))
  .filter(entry => entry.isDirectory() && existsSync(join(uiRoot, entry.name, `${entry.name}.tsx`)))
  .map(entry => entry.name)
  .sort()

function rewriteUiImports(source, names, target) {
  for (const name of names) {
    const paths = [`${uiAlias}/${name}`, `${uiAlias}/${name}/${name}`]
    if (target !== "barrel") paths.push(`../${name}/${name}`)
    const replacement =
      target === "nested"
        ? `../${name}/${name}`
        : target === "flat"
          ? `${uiAlias}/${name}`
          : uiAlias

    for (const quote of ['"', "'"]) {
      for (const path of paths) {
        source = source.replaceAll(
          `from ${quote}${path}${quote}`,
          `from ${quote}${replacement}${quote}`
        )
      }
    }
  }
  return source
}

async function updateConsumers(directory, names) {
  const changed = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (path === uiRoot) continue
    if (entry.isDirectory()) {
      changed.push(...(await updateConsumers(path, names)))
    } else if (/\.[jt]sx?$/.test(entry.name)) {
      const source = await readFile(path, "utf8")
      const updated = rewriteUiImports(source, names, "barrel")
      if (source !== updated) {
        await writeFile(path, updated)
        changed.push(path)
      }
    }
  }
  return changed
}

async function restoreLayout() {
  const files = (await readdir(uiRoot)).filter(name => name.endsWith(".tsx")).sort()
  const names = [...new Set([...components, ...files.map(name => name.slice(0, -4))])].sort()
  for (const file of files) {
    const name = file.slice(0, -4)
    const source = await readFile(join(uiRoot, file), "utf8")
    await mkdir(join(uiRoot, name), { recursive: true })
    await writeFile(join(uiRoot, name, file), rewriteUiImports(source, names, "nested"))
    await unlink(join(uiRoot, file))
  }
  await writeFile(
    join(uiRoot, "index.ts"),
    `${names.map(name => `export * from "./${name}/${name}"`).join("\n")}\n`
  )
  return updateConsumers(sourceRoot, names)
}

for (const name of components) {
  if (existsSync(join(uiRoot, `${name}.tsx`))) {
    throw new Error(`Resolve the duplicate flat UI component before running shadcn: ${name}`)
  }
}

let result
let changed = []
try {
  for (const name of components) {
    const source = await readFile(join(uiRoot, name, `${name}.tsx`), "utf8")
    await writeFile(join(uiRoot, `${name}.tsx`), rewriteUiImports(source, components, "flat"))
  }
  result = spawnSync("pnpm", ["dlx", "shadcn@latest", command, ...args], {
    cwd: projectRoot,
    stdio: "inherit"
  })
} finally {
  changed = await restoreLayout()
}

if (result.error) throw result.error
process.exitCode = result.status ?? 1

if (process.exitCode === 0 && command === "add") {
  const check = spawnSync("pnpm", ["exec", "biome", "check", "--write", uiRoot, ...changed], {
    cwd: projectRoot,
    stdio: "inherit"
  })
  if (check.error) throw check.error
  process.exitCode = check.status ?? 1
}
