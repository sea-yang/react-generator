##目录结构：
  -- /
    -- bin
    -- public
      -- dist   // webpack 构建目录
      -- src    // 前端开发目录（后端直接使用该目录中代码）
        -- actions
        -- common
        -- components   // 纯 react 组件
        -- constants
        -- containers   // redux 与 react 组件结合
        -- middleware
        -- reducers
        -- store
        -- app   // 前端入口
        //-- routes.js  // 前端路由，暂不使用
    -- routes   // 后端路由
    -- store    // 后端 store，提供初始 html 和 state，需保证返回数据结构与前端一致
    -- views    // 模板文件

##命令：
  启动：
    dev环境：
      npm run start
    idc环境(先构建)：
      npm run start:prod
  构建： npm run build
