import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();

/* CORS FIX */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend Working Successfully"
  });
});

/* REGISTER ROUTE */
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
