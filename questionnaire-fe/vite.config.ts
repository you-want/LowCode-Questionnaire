import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
// import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components'
import qiankun from 'vite-plugin-qiankun'

const { name } = require('./package')
// useDevMode 开启时与热更新插件冲突
// 如果是在主应用中加载子应用vite,必须打开这个,否则vite加载不成功, 单独运行没影响
const useDevMode = true

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log('mode: ', mode)
  console.log('command: ', command)

  const env = loadEnv(mode, process.cwd())

  console.log('env: ', env)

  let base = '/'
  if (mode === 'prod') base = 'https://xxxxxxxx/question-fe/prod/'
  if (mode === 'test') base = 'https://xxxxxxxx/question-fe/test/'

  const config = {
    // oss 配置
    base,
    envDir: '.env',
    resolve: {
      alias: {
        '@/': '/src/'
      }
    },
    server: {
      host: '0.0.0.0',
      open: true,
      proxy: {
        '/api_dev': {
          target: 'https://api.github.com',
          changeOrigin: true,
          rewrite: (path) => {
            return /\/api_dev\//.test(path) ? path.replace(/\/api_dev\//, '') : path
          }
        },
        '/question/api/': {
          target: 'https://xxxxx.com',
          changeOrigin: true
        }
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: '@import "@/styles/variables.less";',
          additionalData: '@import "@/styles/variables.less";'
        }
      }
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`
    },
    plugins: [
      vue(),
      vueJSX(),
      qiankun('question-fe', { useDevMode })
    // ViteComponents({
    //   customComponentResolvers: [AntDesignVueResolver({
    //     resolveIcons: true
    //   })]
    // })
    ]
  }
  return config
})
