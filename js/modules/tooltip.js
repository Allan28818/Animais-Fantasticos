export default function initTooltip() {
  const tooltips = document.querySelectorAll("[data-tooltip]");

  if (tooltips) {
    tooltips.forEach((item) => {
      item.addEventListener("mouseover", onMouseOver);
    });

    function onMouseOver(event) {
      const tooltipBox = criarTooltipBox(this);
      tooltipBox.style.top = event.pageY + "px";
      tooltipBox.style.left = event.pageX + "px";

      onMouseLeave.tooltipBox = tooltipBox;
      onMouseLeave.element = this;
      onMouseMove.tooltipBox = tooltipBox;
      onMouseMove.element = this;
      this.addEventListener("mouseleave", onMouseLeave);
      this.addEventListener("mousemove", onMouseMove);
    }

    const onMouseLeave = {
      handleEvent() {
        this.tooltipBox.remove();
        this.element.removeEventListener("mouseleave", onMouseLeave);
      },
    };

    const onMouseMove = {
      handleEvent(event) {
        this.tooltipBox.style.top = event.pageY + 20 + "px";
        this.tooltipBox.style.left = event.pageX + 20 + "px";
        this.addEventListener("mousemove", onMouseMove);
      },
    };

    function criarTooltipBox(element) {
      const tooltipBox = document.createElement("div");
      const text = element.getAttribute("aria-label");
      tooltipBox.classList.add("tooltip");
      tooltipBox.innerText = text;
      document.body.appendChild(tooltipBox);
      return tooltipBox;
    }
  }
}
