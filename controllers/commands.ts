// controllers/commands.ts

const handleGet = async (req, res, db) => {
    const { name } = req.query;
    try {
      let query = db('sensors');
      if (name) {
        query = query.where({ name });
      }
      const result = await query.select('*');
      res.status(200).json(result);
    } catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).json('unable to fetch data');
    }
  };
  
  const handlePost = async (req, res, db) => {
    const { name, bottlescleaned, soaplevel, sanitation, numbottlesfilled } = req.body;
    if (!name || bottlescleaned === undefined || soaplevel === undefined || sanitation === undefined || numbottlesfilled === undefined) {
      return res.status(400).json({ message: 'Incorrect form submission' });
    }
  
    try {
      await db.transaction(async (trx) => {
        await trx('sensors').insert({
          name,
          bottlescleaned,
          soaplevel,
          sanitation,
          numbottlesfilled,
        });
      });
      res.status(200).json('successfully entered');
    } catch (err) {
      console.error('Database transaction error:', err);
      res.status(500).json('unable to post into database');
    }
  };
  
  const handlePut = async (req, res, db) => {
    const { id, name, bottlescleaned, soaplevel, sanitation, numbottlesfilled } = req.body;
    if (!id) {
      return res.status(400).json('ID is required to update entry');
    }
  
    try {
      const updatedRows = await db('sensors')
        .where({ id })
        .update({
          name,
          bottlescleaned,
          soaplevel,
          sanitation,
          numbottlesfilled,
        });
  
      if (updatedRows) {
        res.status(200).json('entry successfully updated');
      } else {
        res.status(404).json('entry not found');
      }
    } catch (err) {
      console.error('Error updating entry:', err);
      res.status(500).json('unable to update entry');
    }
  };
  
  const handleDelete = async (req, res, db) => {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json('ID is required to delete entry');
    }
  
    try {
      const deletedRows = await db('sensors').where({ id }).del();
      if (deletedRows) {
        res.status(200).json('entry successfully deleted');
      } else {
        res.status(404).json('entry not found');
      }
    } catch (err) {
      console.error('Error deleting entry:', err);
      res.status(500).json('unable to delete entry');
    }
  };
  
  export { handleGet, handlePost, handlePut, handleDelete };
  