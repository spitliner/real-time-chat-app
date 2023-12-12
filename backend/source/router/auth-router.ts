import express from 'express';
import typia from 'typia'; // eslint-disable-line import/no-extraneous-dependencies

const authRouter = express.Router(); // eslint-disable-line new-cap

authRouter.post('/login', async (request, response) => {
	try {
		if (!typia.is<string>(request.body.username) || !typia.is<string>(request.body.password)) {
			return response.status(400).json({error: 'missing login information'});
		}

		const username = String(request.body.username);
		const password = String(request.body.password);

		return response.status(200).json({token: '', type: 'jwt', uid: ''});
	} catch (error) {
		console.log(error);
		return response.status(500).json({error: 'unexpected server error'});
	}
});

export default authRouter;
