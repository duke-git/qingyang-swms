const config = {
    production: {
        sequelize: { //数据库 地址，名称，用户名，密码
            host: 'localhost',
            DBName: 'swms',
            userName: 'root',
            password: '123456'
        },
        secretkey: 'iqingyang_swms',
        apiHost: 'http://127.0.0.1'
    },
    sit: {
        sequelize: {
            host: 'localhost',
            DBName: 'swms',
            userName: 'root',
            password: '123456'
        },
        secretkey: 'iqingyang_swms',
        apiHost: 'http://127.0.0.1'
    },
    dev: {
        sequelize: {
            host: 'localhost',
            DBName: 'swms',
            userName: 'root',
            password: '123456'
        },
        secretkey: 'iqingyang_swms',
        apiHost: 'http://127.0.0.1'
    },
    getEnv: function(){
        const me = this;
        const node_env = {
            'dev': me.dev,
            'sit': me.sit,
            'production': me.production
        }
        //console.log(process.env.NODE_ENV === 'dev' ? '已启动测试环境' : '已启动线上环境');
        //return node_env[process.env.NODE_ENV];
        return process.env.NODE_ENV === 'dev' ? me.dev : me.production;
    }
};

module.exports = config.getEnv();