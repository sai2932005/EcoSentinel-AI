

const fs = require('fs') ;
const ai = require('../config/geminiConfig.js') ;

const analyzer =async(req,res)=>{

    try{
    if(!req.file){
        return res.status(400).json({message:"No image provided"}) ;
    }
      
    const imageBuffer = fs.readFileSync(req.file.path) ;
    const base64Img = imageBuffer.toString('base64') ;
    

    
    const prompt = `
            You are an environmental issue classifier. Analyze this image and respond
            ONLY with a valid JSON object (no markdown, no backticks, no extra text)
            in exactly this format:

            {
            "issueType": one of ["Garbage Dumping", "Water Leak", "Sewage Overflow", "Polluted Water", "Open Drain", "Dead Tree", "Construction Waste", "Plastic Waste", "Other"],
            "severity": one of ["Low", "Medium", "High", "Critical"],
            "confidence": a number between 0 and 100,
            "reasoning": a short 1-2 sentence explanation,
            "recommendation": a short 1 sentence recommended action
            }

            Your task is to analyze ONLY the visible content of the uploaded image.

            Rules:
            - Do not guess facts that cannot be seen.
            - If the image is blurry or unclear, lower the confidence score.
            - If no environmental issue is visible, set issueType to "Other".
            - Base your reasoning only on visible evidence.

            Severity Guidelines:

                Low:
                - Small issue
                - Limited environmental impact

                Medium:
                - Noticeable issue
                - Should be addressed soon

                High:
                - Significant issue
                - May cause environmental or public health problems

                Critical:
                - Immediate danger
                - Requires urgent attention



            If the image does NOT show a genuine environmental issue, still respond in
            this exact JSON format but set "issueType" to "Other" and "confidence" low.
            `;
        const response = await ai.models.generateContent({
                model: 'gemini-flash-latest',
                contents: [
                    {
                    role: 'user',
                    parts: [
                        { text: prompt },
                        {
                        inlineData: {
                            mimeType: req.file.mimetype,
                            data: base64Img,
                        },
                        },
                    ],
                    },
                ],
            });

    const responseText = response.text;
    const cleanedText = responseText.replace(/```json|```/g, '').trim();
    const analysis = JSON.parse(cleanedText);

    res.status(200).json({
      ...analysis,
      imagePath: `/uploads/${req.file.filename}`,
    });

  } catch (error) {
    console.error('Gemini analysis error:', error);
    res.status(500).json({ message: 'AI analysis failed', error: error.message });
  }

};

module.exports = { analyzer };


            


