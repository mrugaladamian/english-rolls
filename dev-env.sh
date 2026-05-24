alias up="./vendor/bin/sail up -d"
alias down="./vendor/bin/sail down"
alias build="./vendor/bin/sail npm run build"
alias l="git log --oneline"
alias log=l
alias b="git branch"
alias branch=b
alias pull="git pull"
alias push="git push"
alias s="git status"
alias status=s
alias d="git branch -d"
alias delete=d
alias f="git reset --hard HEAD && git clean -fd"
alias fresh=f
alias switch="git switch"
alias a="git add ."
alias add=a
alias c="git commit -m"
alias commit=c
alias backup="./codeplatform/tools/bin/backup.sh"

chmod +x codeplatform/tools/bin/*