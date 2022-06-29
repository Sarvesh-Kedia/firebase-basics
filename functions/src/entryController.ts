import { Response } from 'express'
import { db } from './config/firebase'


type EntryType = {
    title: string,
    text: string,
    coverImageUrl: string
}

  
type Request = {
    body: EntryType,
    params: { entryId: string }
}



const addEntry = async (req: Request, res: Response) => {
    const { title, text } = req.body
    try {
      const entry = db.collection('entries').doc()
      const entryObject = {
        id: entry.id,
        title,
        text,
      }
  
      entry.set(entryObject)
  
      res.status(200).send({
        status: 'success',
        message: 'entry added successfully',
        data: entryObject
      })
    } catch(error) {
      if (error instanceof Error) {
        res.status(500).json(error.message)
      } else {
        console.log('Unexpected error', error);
      }
        
    }
}

const listAllEntries = async (req: Request, res: Response) => {
  try {
    const allEntries: EntryType[] = []
    const querySnapshot = await db.collection('entries').get();
    
    querySnapshot.forEach((doc: any) => allEntries.push(doc.data()))

    return res.status(200).json({
      status: 'success',
      message: 'retrieved all entries successfully',
      data: allEntries
    })
  
  } catch(error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message)
    } else {
      console.log('Unexpected error', error);
      return res.json({"message": 'Unexpected error', "Error Message": error});
    }
      
  }
}


export { addEntry, listAllEntries }
