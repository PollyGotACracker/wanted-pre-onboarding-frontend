import { rest } from "msw";

const baseURL = "https://www.pre-onboarding-selection-task.shop";

export const authServices = [
  rest.post(`${baseURL}/auth/signin`, async (req, res, ctx) => {
    const { email, password } = await req.json();
    const user = { email: "polly@polly.com", password: "12341234" };
    const access_token = "test-token";

    if (email === user.email && password === user.password) {
      return res(ctx.status(200), ctx.json({ access_token: access_token }));
    } else {
      return res(ctx.status(401), ctx.json({}));
    }
  }),
];

export const todoServices = [
  rest.get(`${baseURL}/todos`, async (req, res, ctx) => {
    // const isAuthorized = user.authorize(req.headers.Authorization);
    // if (!isAuthorized) {
    //   return res(ctx.status(401), ctx.json({ message: "Unauthorized" }));
    // }
    const data = [
      { id: 19455, todo: "test1", isCompleted: true, userId: 4008 },
      { id: 23374, todo: "test2", isCompleted: true, userId: 4008 },
      { id: 23375, todo: "test3", isCompleted: false, userId: 4008 },
      { id: 23383, todo: "test4", isCompleted: false, userId: 4008 },
    ];

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.post(`${baseURL}/todos`, async (req, res, ctx) => {
    const { todo } = await req.json();
    const data = {
      id: 35654,
      isCompleted: false,
      todo: todo,
      userId: 4008,
    };

    return res(ctx.status(200), ctx.json(data));
  }),
];
