import jwt from "jsonwebtoken";
const privateKey = "abcdef";
export const createToken = (data, privateKey) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: data.username, password: data.password },
      privateKey,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          reject(err.message);
        }
        resolve(token);
      }
    );
  });
};
export const createAccess = async (req, res) => {

  const infor = { username: req.body.username, password: req.body.password };

  const token = await createToken(infor, privateKey);
  return res.json({ token });
}
