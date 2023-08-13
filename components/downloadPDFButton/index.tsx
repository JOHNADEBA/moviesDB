import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const DownloadPDFButton = () => {
  const downloadPDF = () => {
    const input = document.getElementById("download_movie_details");

    if (input) {
      const images = input.getElementsByTagName("img");
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        if (!image.complete) {
          console.log("Images are still loading. Wait for all images to load.");
          return;
        }
      }

      html2canvas(input, { useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4", true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 0;
        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );
        pdf.save("movie.pdf");
      });
    }
  };

  return (
    <div>
      <Button
        sx={{
          m: 0.5,
          color: "rgba(255, 255, 255, 0.6)",
          "&:hover": {
            color: "rgba(255, 255, 255, 1)",
          },
        }}
        startIcon={<FileDownloadIcon />}
        variant="outlined"
        onClick={downloadPDF}
      >
        Download movie as PDF
      </Button>
    </div>
  );
};

export default DownloadPDFButton;
