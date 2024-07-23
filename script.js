document.addEventListener('DOMContentLoaded', () => {
      const circles = document.querySelectorAll('.progress-circle');

      console.log(circles);

      circles.forEach((circle) => {
            const radius = circle.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (78 / 100) * circumference; // 78% for example

            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = circumference;
            circle.style.transition = 'stroke-dashoffset 2s ease-out';
            circle.style.strokeDashoffset = offset;
      }) 
      
      
});

