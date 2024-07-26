import { MongoClient, ServerApiVersion  } from 'mongodb';

export default  async  function statusbutton (req,res)  {

    const uri = "mongodb+srv://Monie:1234@cluster0.jl8dvxy.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
    );

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed', success: false });
      }
    
    try{

        await client.connect();
        const temp  = client.db('iot').collection('temp');

        const gettemp  = await temp.findOne({ target : 0},{})

        console.log("gettemp = ",gettemp);
        
        if(gettemp){
            return( res.status(200).json({ message: 'Get status success',gettemp, success: true}))
            
        }

        else{
            return ( res.status(400).json({message: 'Get status failed', success: false}))
        }



    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, success: false });
      } finally {
        await client.close();
    }



}