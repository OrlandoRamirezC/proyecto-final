import request from 'supertest';
import app from '../server.js';
import jwt from 'jsonwebtoken';

describe('API /products', () => {

    it("Obteniendo un 200 GET", async () => {
        const res = await request(app).get('/products').send();
        const status = res.statusCode;
        expect(status).toBe(200);
    })

    it('Regresa products como un array', async () => {
        const res = await request(app).get('/products').send();
        expect(res.body.products).toBeInstanceOf(Array);
    });

});

describe('API /users', () => {
  it('Debería retornar 200 con token válido', async () => {
    const token = jwt.sign(
      { email: 'test@example.com' },
      process.env.JWTSECRET,
      { expiresIn: '1h' }
    );

    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});

describe('API /login', () => {
  it("Debería retornar 200 al hacer POST con email y contraseña válidos", async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'test1@test.com',
        password: '123123'
      });

    expect(res.statusCode).toBe(200);
  });
});
