# FROM node:20 AS build
# # MAINTAINER easydoc.net

# # 复制代码
# # ADD . /app

# # 设置容器启动后的默认运行目录
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

# # 运行命令，安装依赖
# # RUN 命令可以有多个，但是可以用 && 连接多个命令来减少层级。
# # 例如 RUN npm install && cd /app && mkdir logs
# # RUN npm install --registry=https://registry.npmmirror.com
# # 设置环境变量
# # ENV NODE_ENV=production
# # ENV NODE_OPTIONS="--max-old-space-size=128"

# # 安装依赖
# # RUN --mount=type=cache,target=/root/.npm \
# #     npm ci --omit=dev
# # 复制 package.json 和 package-lock.json（如果使用 npm）
# COPY package*.json ./

# # 安装前端依赖
# # RUN npm install

# # CMD 指令只能一个，是容器启动后执行的命令，算是程序的入口。
# # 如果还需要运行其他命令可以用 && 连接，也可以写成一个shell脚本去执行。
# # 例如 CMD cd /app && ./start.sh
# # CMD node app.js
# # CMD npm run dev

# # 复制前端源代码到工作目录
# COPY dist .

# 构建 Vue 应用
# RUN npm run build

# 使用 Nginx 作为基础镜像，用于生产环境的静态文件服务
# FROM nginx:stable-alpine
FROM nginx:latest
COPY ./dist /usr/share/nginx/html
# 配置 Nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# 开放 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]

# 打镜像部署
# docker build -t test:v1 .
# 运行镜像
# docker run -p 9090:8080 --name test-hello test:v1