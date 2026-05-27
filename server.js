import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get("/", (req, res) => {
  res.json({
    message: "Server Running Successfully"
  });
});

app.post("/register", async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      gender,
      qualification,
      age,
      address,
      phone,
      father_name,
      mother_name
    } = req.body;

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password,
          gender,
          qualification,
          age,
          address,
          phone,
          father_name,
          mother_name
        }
      ]);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Registration Successful",
      data
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server Running on Port ${process.env.PORT}`);
});
