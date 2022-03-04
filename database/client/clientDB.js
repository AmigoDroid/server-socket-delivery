const cliente_user = require('../config/clientes_users');
const clienteStore = require('../config/clientes_stores');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY || "keyteste-api-v1.0";

 

module.exports = {
    async login(obj) {
        const dados = obj;
        const tel = dados.telefone;
        const pass = dados.password;
        var res;

        console.log(dados);
        //
        const user = await cliente_user.findAll();
        //const db = JSON.parse(user)
        const num = user.length;
        if (user.length <= 0) {
            res = { status: false }
        } else {
            for (let i = 0; i < num; i++) {
                console.log(1+i + "/" + num);
                if (user[i].telefone == tel && user[i].password == pass) {
                    const token = jwt.sign({userId:user.id},secret,{expiresIn:28800});
                   res = { status: true,token:token};
                    break;
                } else if (i + 1 >= num) {
                    res = { status: false };
                    break;
                }
            }
        }
        return res;
    },
    async idLoja(req,res){
        const id = req.params.id;
        const Loja = await clienteStore.findAll();
        const num = Loja.length;

        for(let i =0; i<num;i++){
            if(Loja[i].id == id){
                return res.json({status:true})
            }else{
                if(i>num){
                    return res.json({status:false})
                }
            }
        }
    },
    async cadastro(req, res) {
        const usuario = req.body;
        const novo = cliente_user.create(usuario).then(() => {
            return res.json({status:true})
        }).catch(() => {
            return res.json({status:false});
        });
    },
    async home(req,res) {
        const dados = await clienteStore.findAll();
        res.json({status:true,body:dados});
    },
    async listar(req,res)  {
        const db = await cliente_user.findAll();
       return res.json({status:true,body:db});
    },
    async cadastrarLoja(req,res){
        const dados = req.body;
        const nloja =  clienteStore.create(dados).then(()=>{
            return res.json({status:true});
        }).catch(()=>{
            return res.json({status:false});
        })
    },
    async loginLoja(req,res) {
        const dados = req.body;
        const tel = dados.username;
        const pass = dados.password;

        console.log(dados);
        //
        const user = await clienteStore.findAll();
        //const db = JSON.parse(user)
        const num = user.length;
        if (user.length <= 0) {
            return res.json({ status: false })
        } else {
            for (let i = 0; i < num; i++) {
                console.log(1+i + "/" + num);
                if (user[i].username == tel && user[i].password == pass) {
                    const token = jwt.sign({userId:user.id},secret,{expiresIn:28800});
                    const resp ={ status: true,token:token,idLoja:user[i].id};
                    return res.json(resp);
                    break;
                } else if (i + 1 >= num) {
                    const resp= {status: false}
                    return res.json(resp);
                    break;
                }
            }
        }
    }}