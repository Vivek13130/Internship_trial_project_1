
// answer header dropdown :
let drop_down = document.querySelector(".drop-down");

drop_down.addEventListener('click', () => {
      let score_analysis = document.querySelector(".score-analysis");
      let text_analysis = document.querySelector(".text-analysis");
      let drop_down_icon = document.querySelector(".drop-down img");

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
let incorrect_spans = document.querySelectorAll(".answer-statement > p > span");

let correction_element = null;

let correct_red_span = document.querySelector(".correct-red-span");
let correct_yellow_span = document.querySelector(".correct-yellow-span");
let correct_purple_span = document.querySelector(".correct-purple-span");


// incorrect_spans.forEach((span) => {


//       span.addEventListener('mouseenter', function (event) {
//             const rect = span.getBoundingClientRect();
//             correction_element.style.left = `${rect.left}px`;
//             correction_element.style.top = `${rect.bottom + window.scrollY}px`;
//             correction_element.style.display = 'block';
//       });

//       span.addEventListener('mouseleave', function () {

//             setTimeout(() => {
//                   if (!correction_element.matches(':hover')) {
//                         correction_element.style.display = 'none';
//                   }
//             }, 1);

//       });

//       correction_element.addEventListener('mouseenter', function () {
//             correction_element.style.display = 'block';
//       });

//       correction_element.addEventListener('mouseleave', function () {
//             correction_element.style.display = 'none';
//       });
// });


const spanClassToCorrectionId = {
      'red-span1': 'correct-red-span',
      'red-span2': 'correct-red-span',
      'red-span3': 'correct-red-span',
      'yellow-span1': 'correct-yellow-span',
      'yellow-span2': 'correct-yellow-span',
      'purple-span1': 'correct-purple-span',
      'purple-span2': 'correct-purple-span',
};

Object.keys(spanClassToCorrectionId).forEach(spanClass => {
      const extra_elements = document.getElementById(spanClassToCorrectionId[spanClass]);
      extra_elements.style.display = "none";
})

Object.keys(spanClassToCorrectionId).forEach(spanClass => {
      const spans = document.querySelectorAll(`.${spanClass}`);
      const correctionElement = document.getElementById(spanClassToCorrectionId[spanClass]);

      spans.forEach(span => {
            const mouseEnterHandler = function () {
                  const rect = span.getBoundingClientRect();
                  correctionElement.style.left = `${rect.left}px`;
                  correctionElement.style.top = `${rect.bottom + window.scrollY}px`;
                  correctionElement.style.display = 'block';
            };

            const mouseLeaveHandler = function () {
                  setTimeout(() => {
                        if (!correctionElement.matches(':hover')) {
                              correctionElement.style.display = 'none';
                        }
                  }, 1);
            };

            span.addEventListener('mouseenter', mouseEnterHandler);
            span.addEventListener('mouseleave', mouseLeaveHandler);

            correctionElement.addEventListener('mouseenter', function () {
                  correctionElement.style.display = 'block';
            });

            correctionElement.addEventListener('mouseleave', function () {
                  correctionElement.style.display = 'none';
            });

            const deleteButton = correctionElement.querySelector('.delete-btn');
            deleteButton.addEventListener('click', function () {
                  span.removeEventListener('mouseenter', mouseEnterHandler);
                  span.removeEventListener('mouseleave', mouseLeaveHandler);
                  // correctionElement.style.display = 'none';

                  deleteButton.innerText = "DONE"
                  deleteButton.style.fontWeight = "600";
                  deleteButton.style.color = "#07c400"
                  deleteButton.style.letterSpacing = "1px"
                  deleteButton.style.backgroundColor = "#ebffeb";
            });
      });
});



// handling the circular progress bars : 

let circle_containers = document.querySelectorAll('.progress-container');
let max_progress = 10;


circle_containers.forEach((circle_container) => {
      let circle = circle_container.querySelector(".progress-circle")
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







