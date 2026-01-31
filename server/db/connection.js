import mongoose from "mongoose";


export const connectDB = async () => {
  await mongoose.connect(`${process.env.MONGODB_URL}/nest-blog`).then((res) => console.log('DB Connected ')
  ).catch((err) => console.log(err)
  );
}; 