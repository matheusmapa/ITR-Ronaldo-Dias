---
description: Commits all changes, pushes to the main branch, and sends a notification to the ITR channel on ntfy.sh.
---

// turbo-all
# Task: Publish changes and notify

1. Add all files to the staging area:
   `git add .`

2. Commit changes with a specific message:
   `git commit -m "{{message}}"`

3. Push changes to the remote main branch:
   `git push origin main`

4. Send a notification to the Metodo_ITR channel:
   `curl.exe -d "{{notification}}" -H "Title: ITR Socio Tecnico" ntfy.sh/Metodo_ITR`
