---
layout: post
title: git基本用法
category: notes
description: 版本控制
disqus: false
---

## 设置（每台电脑仅需要一次）:
* $ git config --global user.name "Your Name"
* $ git config --global user.email "your.email@example.com"
* $ git config --global color.ui true         (设置颜色)
* $ git config --global alias.co checkout     (设置别名)
* $ git config --global alias.ci commit
* $ git config --global alias.st status
* $ git config --global alias.br branch
* $ git config --global core.editor "mate -w"    (设置Editor使用textmate)
* $ git config -l  (列举所有配置)



## 版本库操作:
* $ git init            (初始化)
* $ git help <command>  (显示command的help)

* $ git show            (显示某次提交的内容)
* $ git show $id

* $ git add <file>      (将工作文件修改提交到本地暂存区)
* $ git add .           (将所有修改过的工作文件提交暂存区)

* $ git checkout  -- <file>   (抛弃工作区修改)
* $ git checkout .           (抛弃工作区修改)

* $ git rm <file>       (从版本库中删除文件)
* $ git rm <file> --cached  (从版本库中删除文件，但不删除文件)
 
* $ git reset <file>    (从暂存区恢复到工作文件)
* $ git reset -- .      (从暂存区恢复到工作文件)
* $ git reset --hard    (恢复最近一次提交过的状态，即放弃上次提交后的所有本次修改)
* $ git reset HEAD~1        (撤销最后一次提交。)
* $ git reset --hard HEAD^  (撤销最后一次提交并清除本地修改。)
* $ git reset SHA1          (回到SHA1对应的提交状态。)

* $ git commit <file>
* $ git commit .
* $ git commit -a -m "命令名"        (将git add, git rm和git ci等操作都合并在一起做)
* $ git commit -am "some comments"
* $ git commit --amend      (修改最后一次提交记录)
 
* $ git revert <$id>    (恢复某次提交的状态，恢复动作本身也创建了一次提交对象)
* $ git revert HEAD     (恢复最后一次提交的状态)



## 查看文件不同:
* $ git diff <file>     (比较当前文件和暂存区文件差异)
* $ git diff
* $ git diff <$id1> <$id2>   (比较两次提交之间的差异)
* $ git diff <branch1>..<branch2> (在两个分支之间比较)
* $ git diff --staged   (比较暂存区和版本库差异)
* $ git diff --cached   (比较暂存区和版本库差异)
* $ git diff --stat     (仅仅比较统计信息)



## 查看提交记录:
* $ git log
* $ git log <file>      (查看该文件每次提交记录)
* $ git log -p <file>   (查看每次详细修改内容的diff)
* $ git log -p -2       (查看最近两次详细修改内容的diff)
* $ git log --stat      (查看提交统计信息)
* $ tig     (Mac上可以使用tig代替diff和log，brew install tig)



## 查看、切换、创建和删除分支:
* $ git branch -r           (查看远程分支)
* $ git branch -v           (查看各个分支最后提交信息)
* $ git branch 分支名称      (创建新的分支)
* $ git branch --merged     (查看已经被合并到当前分支的分支)
* $ git branch --no-merged  (查看尚未被合并到当前分支的分支)
 
* $ git checkout 分支名    (切换到某个分支)
* $ git checkout -b 分支名称  (创建新的分支，并且切换过去)
* $ git checkout -b <new_branch> <branch>  # 基于branch创建新的new_branch
 
* $ git checkout $id          (把某次历史提交记录checkout出来，但无分支信息，切换到其他分支会自动删除)
* $ git checkout $id -b <new_branch>  (把某次历史提交记录checkout出来，创建成一个分支)

* $ git branch -d 分支名称  (删除某个分支)
* $ git branch -D 分支名称  (强制删除某个分支--未被合并的分支被删除的时候需要强制)



## 分支合并和rebase:
* $ git merge 分支名称              (将branch分支合并到当前分支)
* $ git merge origin/master --no-ff  (不要Fast-Foward合并，这样可以生成merge提交)
 
* $ git rebase master <branch>       (将master rebase到branch，相当于：
* $ git checkout <branch> && git rebase master && git checkout master && git merge <branch> )



## Git远程分支管理:
* $ git pull                         # 抓取远程仓库所有分支更新并合并到本地
* $ git pull --no-ff                 # 抓取远程仓库所有分支更新并合并到本地，不要快进合并
* $ git fetch origin                 # 抓取远程仓库更新
* $ git merge origin/master          # 将远程主分支合并到本地当前分支
* $ git co --track origin/branch     # 跟踪某个远程分支创建相应的本地分支
* $ git co -b <local_branch> origin/<remote_branch>  # 基于远程分支创建本地分支，功能同上
 
* $ git push                         # push所有分支
* $ git push origin master           # 将本地主分支推到远程主分支
* $ git push -u origin master        # 将本地主分支推到远程(如无远程主分支则创建，用于初始化远程仓库)
* $ git push origin <local_branch>   # 创建远程分支， origin是远程仓库名
* $ git push origin <local_branch>:<remote_branch>  # 创建远程分支
* $ git push origin :<remote_branch>  #先删除本地分支(git br -d <branch>)，然后再push删除远程分支



## Git远程仓库管理:
* $ git remote -v                    # 查看远程服务器地址和仓库名称
* $ git remote show origin           # 查看远程服务器仓库状态
* $ git remote add origin git@github:robbin/robbin_site.git         # 添加远程仓库地址
* $ git remote set-url origin git@github.com:robbin/robbin_site.git # 设置远程仓库地址(用于修改远程仓库地址)
* $ git remote rm <repository>       # 删除远程仓库



## 创建远程仓库:
* $ git clone --bare robbin_site robbin_site.git  # 用带版本的项目创建纯版本仓库
* $ scp -r my_project.git git@git.csdn.net:~      # 将纯仓库上传到服务器上
 
* $ mkdir robbin_site.git && cd robbin_site.git && git --bare init # 在服务器创建纯仓库
* $ git remote add origin git@github.com:robbin/robbin_site.git    # 设置远程仓库地址
* $ git push -u origin master                                      # 客户端首次提交
* $ git push -u origin develop  # 首次将本地develop分支提交到远程develop分支，并且track
 
* $ git remote set-head origin master   # 设置远程仓库的HEAD指向master分支



## Git暂存管理:
* $ git stash                        # 暂存
* $ git stash list                   # 列所有stash
* $ git stash apply                  # 恢复暂存的内容
* $ git stash drop                   # 删除暂存区



## Git补丁管理(方便在多台机器上开发同步时用):
* $ git diff > ../sync.patch         # 生成补丁
* $ git apply ../sync.patch          # 打补丁
* $ git apply --check ../sync.patch  # 测试补丁能否成功



## 命令设置跟踪远程库和本地库:
* $ git branch --set-upstream master origin/master
* $ git branch --set-upstream develop origin/develop




## 第一次推送到github:
To add new remotes:
* $ git remote add origin git@github.com:<username>/first_app.git

To remove remotes:
* $ git remote rm <name>

To push to remotes:
* $ git push -u origin master(branch)


Copy other rep:
* $ git clone xxx(url)


Show:
* $ git remote show origin

To clean up deleted remote branches:
* $ git remote prune origin


## 推送github:
* $ git push


list all tags:
* $ git tag

Check out:
* $ git checkout v0.0.1

To add a new tag:
* $ git tag -a v0.0.3 -m "version 0.0.3"

To push new tags:
* $ git push --tags


##从远程获取最新版本到本地，不会自动merge：
* $ git fetch：
    
	* $ git fetch origin master
	* $ git log -p master..origin/master
	git merge origin/master


    	以上命令的含义：
   		首先从远程的origin的master主分支下载最新的版本到origin/master分支上
   		然后比较本地的master分支和origin/master分支的差别
   		最后进行合并

   	上述过程其实可以用以下更清晰的方式来进行：
  
	* $ git fetch origin master:tmp
	* $ git diff tmp
	* $ git merge tmp

    
    		从远程获取最新的版本到本地的test分支上
   		之后再进行比较合并



从远程获取最新版本并merge到本地:
* $ git pull：
  
	* $ git pull origin master


    	上述命令其实相当于git fetch 和 git merge
    	在实际使用中，git fetch更安全一些
   	因为在merge前，我们可以查看更新情况，然后再决定是否合并


pull Request:

删除远端分支：
* $ git push origin :xxx(分支名)

继续clone项目：
* $ git remote add upstream git@github.com:xxx
* $ git checkout master
* $ git pull upstream master


本地新建分支
* $ git check -b add_sth

把本地的 add_sth 分支保存的 github 上
* $ git push orign add_sth

删除本地 add_sth 分支
* $ git branch -D add_sth

删除 github 上的 add_sth 分支
* $ git push orign :add_sth


