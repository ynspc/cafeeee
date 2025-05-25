const express = require('express');
const { PrismaClient, ItemType } = require('./generated/prisma/client');
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

app.post('/order-log', async (req, res) => {
  const body = req.body;
  console.log(body);
  const location = body?.extracted_details?.location;
  const items = body?.extracted_details?.items;
  const notes = body?.extracted_details?.notes;
  const total_quantity = body?.extracted_details?.total_quantity;
  
  const orderDetail = await  prisma.order.create({
    data: {
      timestamp: new Date(),
      userInput: body?.user_input,
      predictedAction: body?.predicted_action,
      actualAction: body?.actual_action,
      totalQuantity: total_quantity,
      notes: notes,
      location: {
        create: {
          table: location.table,
          floor: location.floor,
          block: location.block
        }
      },
      items: {
        create: items.map((item) => ({
          type: item.type,
          name: item.name,
          quantity: item.quantity,
          variant: item.variant ?? null,
          flavor: item.flavor ?? null,
          customizations: item.customizations
            ? {
                create: item.customizations.map((c) => ({
                  value: c
                }))
              }
            : undefined
        }))
      }
    },
    include: {
      location: true,
      items: {
        include: {
          customizations: true
        }
      }
    }
  });

  res.json(orderDetail);
});

app.post('/action-log', async (req, res) => {
  const body = req.body;
  console.log(body);
  
  const actionDetail = await  prisma.actionLogs.create({
    data: {
      timestamp: new Date(),
      userInput: body?.user_input,
      predictedAction: body?.predicted_action,
      actualAction: body?.actual_action,
      language: body?.language
    }
  });

  res.json(actionDetail);
});


app.get('/action-log', async (req, res) => {
  const logs = await prisma.actionLogs.findMany({});
  res.json(logs);
});

app.listen(process.env.PORT, () => {
  console.log(`API running at http://localhost:${process.env.PORT}`);
});
