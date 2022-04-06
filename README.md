electron-packager . helloWorld --platform=win32 --arch=x64 --icon=icon.ico --out=./out --asar --app-version=1.0.0 --overwrite --ignore=node_modules --electron-version=18.0.1
参数说明：
map ：你将要生成的exe文件的名称
–platform=win32：确定了你要构建哪个平台的应用（Windows、Mac 还是 Linux）,可取的值有 darwin, linux, mas, win32
–arch=x64：决定了使用 x86 （ia32）还是 x64（x64），还是两个架构都用
–icon=自定义.ico：自定义设置应用图标
–out=./out：指定打包文件输出的文件夹位置,当前指定的为项目目录下的release文件夹
–asar：该参数可以不加，如果加上，打包之后应用的源码会以.asar格式存在
–app-version=1.0.0：生成应用的版本号
–overwrite：覆盖原有的build,让新生成的包覆盖原来的包
–ignore=node_modules：如果加上该参数，项目里node_modules模块不会被打包进去
–electron-version 8.2.1：指定当前要构建的electron的电子版本（不带"v"）,需要和当前的版本一致,具体可以在 package.json文件中查看,可以不加该参数，如果不一致，会自动下载。