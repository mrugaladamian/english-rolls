# Codeplatform Tools

This project includes small helper tools in `codeplatform/tools/bin`.

The tools are intended to be run from the project root directory.

## Backup Tools

Backups are stored outside the project in:

```bash
~/codeplatform/backup/projects/english-rolls
```

Backup file names use this format:

```text
DD-MM-YYYY_HH-MM-SS.zip
```

### Create a Backup

```bash
codeplatform/tools/bin/backup
```

This creates a zip archive of the current project directory.

The tool keeps the newest 20 backups and removes older backup files that match the expected backup file name format.

### List Backups

```bash
codeplatform/tools/bin/backup-list
```

This prints all backups for the current project, sorted from newest to oldest.

The output includes:

- backup number
- date and time
- file size
- full backup file path

### Show the Latest Backup

```bash
codeplatform/tools/bin/backup-last
```

This prints the newest backup for the current project.

## Notes

- The project name is detected from the current directory name.
- Run these tools from the project root so the backup path resolves to `english-rolls`.
- The backup archive includes the whole project directory.
- Backup archives are not stored in Git.
