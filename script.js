
// answer header dropdown :
let drop_down = document.querySelector(".drop-down");

drop_down.addEventListener('click', () => {
      let score_analysis = document.querySelector(".score-analysis");
      let text_analysis = document.querySelector(".text-analysis");
      let drop_down_icon = document.querySelector(".drop-down img");

      console.log("hello");

      if (score_analysis.style.display !== "none") {
            score_analysis.style.display = "none";
            text_analysis.style.display = "none";
            drop_down_icon.style.transform = 'rotate(180deg)';
      }
      else {
            score_analysis.style.display = "block";
            text_analysis.style.display = "block";
            drop_down_icon.style.transform = 'rotate(0deg)';

      }
});



// hiding the extra analysis part :
let hide_extra_anlaysis = document.getElementById("hide_extra_analysis");
hide_extra_anlaysis.addEventListener('click', () => {
      let extra_anlaysis = document.querySelector(".extra-analysis");

      if (extra_anlaysis.style.display != "none") {
            extra_anlaysis.style.display = "none";
            hide_extra_anlaysis.querySelector("span").innerText = "Show Full Analysis";
            hide_extra_anlaysis.querySelector("img").style.transform = 'rotate(180deg)';
      }
      else {
            extra_anlaysis.style.display = "block";
            hide_extra_anlaysis.querySelector("span").innerText = "Hide Full Analysis";
            hide_extra_anlaysis.querySelector("img").style.transform = 'rotate(0deg)';
      }
})



// making the corrections appear at there right place :










// handling the circular progress bars : 

let circle_containers = document.querySelectorAll('.progress-container');
console.log(circle_containers);
let max_progress = 10;


circle_containers.forEach((circle_container) => {
      let circle = circle_container.querySelector(".progress-circle")
      console.log(circle);
      let progress_value = Number(circle_container.querySelector(".progress-value").innerText);

      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (progress_value / max_progress) * circumference; // 78% for example

      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = circumference;
      circle.style.transition = 'stroke-dashoffset 2s ease-out';
      circle.style.strokeDashoffset = offset;
})




document.getElementById('downloadBtn').addEventListener('click', () => {
      const sections = [".text-score", ".detailed-analysis", ".text-analysis"]; // queries of all downloading sections
      const pdfContainer = document.getElementById('pdfContainer');

      pdfContainer.style.display = "block";
      pdfContainer.innerHTML = `
            <style>
                  #pdfContainer {
                        margin: 3rem; 
                  }
                  h1 {
                        text-align: center;
                        margin-bottom: 2rem;
                  }
            </style>
            <h1>Acciolibs Report</h1>
            `;

      sections.forEach(query => {
            const elements = document.querySelectorAll(query);
            elements.forEach(element => {
                  pdfContainer.innerHTML += element.outerHTML;
            });
      });


      html2pdf().from(pdfContainer).set({
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      }).save('Acciolbis_report_temp.pdf').then(() => {
            pdfContainer.style.display = "none";
      }).catch(err => {
            console.error("Error generating PDF:", err);
            pdfContainer.style.display = "none";
      });
});







