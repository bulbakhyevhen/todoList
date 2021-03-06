const recordRouter = require('./routers/recordRouter.js');
const userRouter = require('./routers/userRouter.js');
const validateRequest = require('./validation.js');
const jwt_token = require('./token');
const key = require('./key.js');

module.exports = (app) => 
{
    app.use(validateRequest);
    app.use((req, res, next) => 
    {
        if((req.method == "POST" || req.method == "GET") && (req.url == '/signIn' || req.url == '/signUp'))
        {
            next();
        }
        else 
        {
            if(typeof(req.headers.access_token) == 'undefiend')
            {
                res.sendStatus(200);
            }
            else 
            {
                req.access_token = jwt_token.verifyToken(req.headers.access_token, key);
    
                next();
            }    
        }
    });
    app.use('/', userRouter);
    app.use('/records', recordRouter);
};
