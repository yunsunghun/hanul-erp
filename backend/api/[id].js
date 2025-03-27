import { MongoClient } from "mongodb";
export default async function handler(req, res) {
  // 몽고db 클라이언트 URL
  const client = new MongoClient(process.env.MONGOBD_URL);
  //몽고 DB 클라이언트 연결 수립
  await client.connect();
  const db = client.db("hr");
  const employees = db.collection("employees");

  //GET 요청 or POST 요청 인지에 따라서로다른 데이터베이스 요청 처리

  try {
    switch (req.method) {
      case 'PUT':
        const updateEmployee = req.doby;
        const updateResult = await employees.updateOne(
          {_id: new Object(id)},
          {$set: updateEmployee}
        );
        res.status(200).json(allEmployees);
        break;
      case 'DELETE':
        const newEmployee=req.body;
        const newEmployee = await coll.insertOne(newEmployee);
        res.status(200).json(result);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end('${req.method}는 허용되지않습니다!')
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: e.message,
      msg: '서버 통신 오류, 관리자 문의 요망!'
    })
  } finally {
    await client.close();
  }
}