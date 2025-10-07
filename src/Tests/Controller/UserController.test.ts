import request from 'supertest';
import app from '../../main';

describe('GET /api/user/list', () => {
  it('should return a list of users', async () => {
    const res = await request(app).get('/api/user/list');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
