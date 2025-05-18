const express = require('express');
const { PrismaClient } = require('./generated/prisma/client');
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post('/category', async (req, res) => {
  const body = req.body;
  const category = await prisma.category.create({
    data: body 
  });

  res.json(category);
});


app.post('/food-item', async (req, res) => {
  const body = req.body;
  const categoryDetail = await prisma.category.findFirstOrThrow(
    { 
      where: {
        name: body?.category
      }  
    });

  delete body.category;
    
  const foodItem = await prisma.foodItem.create({
    data: {
      ...body,
      categoryId: categoryDetail?.id
    }
  });

  res.json(foodItem);
});

app.get('/menu', async (req, res) => {
  const menus = await prisma.foodItem.findMany({
    include: {
      category: {
        select: {
          name: true
        }
      }
    }
  });
  res.json(menus);
});

app.listen(process.env.PORT, () => {
  console.log(`API running at http://localhost:${process.env.PORT}`);
});
