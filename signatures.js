const { kv } = require('@vercel/kv');

export default async function handler(req, res) {
  // Configurar CORS por si acaso (aunque estarán en el mismo dominio)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      // Leer las firmas desde Vercel KV
      const signatures = await kv.get('signatures');
      return res.status(200).json(signatures || []);
    } 
    
    else if (req.method === 'POST') {
      // Guardar las firmas en Vercel KV
      const signatures = req.body;
      await kv.set('signatures', signatures);
      return res.status(200).json({ status: 'success' });
    }

    else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error("KV Error:", error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
