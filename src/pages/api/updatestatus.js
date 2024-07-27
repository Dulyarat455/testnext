import { MongoClient, ServerApiVersion  } from 'mongodb';

export default  async  function updatebutton (req,res)  {

    const uri = "mongodb+srv://Monie:1234@cluster0.jl8dvxy.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
    );


    const {
        updateStatus,
        } = req.body;

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed', success: false });
      }

    try{

        console.log("upstatus",updateStatus)

        await client.connect();
        const temp  = client.db('iot').collection('temp');

        const changeStatus = await temp.updateOne( {  "target": 0 },{ $set: {  status : updateStatus,
        } });
        
        if(changeStatus){
            return( res.status(200).json({ message: 'change status success', success: true}))
            
        }

        else{
            return ( res.status(400).json({message: 'change status failed', success: false}))
        }

    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, success: false });
      } finally {
        await client.close();
    }



}