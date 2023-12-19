import express from 'express';
import typia from 'typia'; // eslint-disable-line import/no-extraneous-dependencies
const authRouter = express.Router(); // eslint-disable-line new-cap
authRouter.post('/login', async (request, response) => {
    try {
        if (!(input => {
            return "string" === typeof input;
        })(request.body.email) || !(input => {
            return "string" === typeof input;
        })(request.body.password)) {
            return response.status(400).json({ error: 'missing login information' });
        }
        const email = String(request.body.email);
        const password = String(request.body.password);
        return response.status(200).json({ token: email + password, type: 'jwt', uid: '123' });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({ error: 'unexpected server error' });
    }
});
export default authRouter;
