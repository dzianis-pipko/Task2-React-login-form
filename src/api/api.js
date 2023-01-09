const mockDB = {
    users: [ 
        {Email: 'qqqq@qq.qq', password: '11111111'},
        {Email: 'wwww@ww.ww', password: '22222222'}
    ]
}

export const mockAPI = {
    getUser: ({Email, password}) => new Promise((resolve, reject) => {
        if(mockDB.users.find(item => item.Email === Email && item.password === password)){
            resolve(true)
        }else{
            reject(true)
        }
    })
}