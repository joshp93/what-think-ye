import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColourPickerService {
  private colours: Array<string> = Array();
  private usedColours: Array<string> = Array();
  
  constructor() { 
    this.loadColours();
  }

  getRandomColour = () => this.getRandomElementFromArray(this.colours, this.usedColours);

  private loadColours = () => this.colours = [
    "#D98880",
    "#EC7063",
    "#C39BD3",
    "#BB8FCE",
    "#5499C7",
    "#85C1E9",
    "#76D7C4",
    "#7DCEA0",
    "#7DCEA0",
    "#F8C471",
    "#F0B27A",
    "#E59866",
    "#ECF0F1",
    "#D7DBDD",
    "#85929E",
    "#DFFF00"
  ]

  private getRandomElementFromArray(array: Array<string>, usedArray: Array<string>): string {
    let filteredArray = array.filter(element => !usedArray.includes(element));
    if (filteredArray.length === 0) {
      usedArray = new Array<string>();
      array.forEach(element => filteredArray.push(element));
    }
    const index = Math.floor(Math.random() * filteredArray.length);
    const element = filteredArray[index];
    if (!element) {
      console.error("The element was underfined at index " + index, filteredArray);
      return element;
    }
    usedArray.push(element);
    return element;
  }

}
