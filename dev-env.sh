alias up="./vendor/bin/sail up -d"
alias down="./vendor/bin/sail down"
alias build="./vendor/bin/sail npm run build"
alias l="git --no-pager log --oneline -6"
alias log="git --no-pager log --oneline"
alias b="git branch"
alias branch=b
alias pull="git pull"
alias push="git push"
alias s="git status --short --branch"
alias status="git status"
alias d="git branch -d"
alias delete=d
alias f="git reset --hard HEAD && git clean -fd"
alias fresh=f
alias switch="git switch"
alias a="git add ."
alias add=a
alias c="git commit -m"
alias commit=c
alias m="git merge"
alias merge=m
alias t="git tag --sort=v:refname | tail -6"
alias tag="git --no-pager tag"
alias backup="./codeplatform/tools/bin/backup"
alias backup-list="./codeplatform/tools/bin/backup-list"
alias backup-last="./codeplatform/tools/bin/backup-last"

chmod +x codeplatform/tools/bin/*
