if [ -z "$1" ]
then
    msg="automated: :rocket: force deploy from dev"
else
    msg=$1
fi


git checkout dev

git add .

git commit -am "$msg"

git checkout main

git merge dev

git push --all

git checkout dev