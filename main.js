const fs = require('fs');
const path = require('path');
const inputCsvFilePath = path.join(__dirname, '/inputs/input_data.csv');
const menuFilePath = path.join(__dirname, '/inputs/dhaba_menu.json');
const outputCsvPath = path.join(__dirname, '/outputs/network_graph.csv');
const menuData = JSON.parse(fs.readFileSync(menuFilePath, 'utf8'));

const csvData = fs.readFileSync(inputCsvFilePath, 'utf8').split('\n');
csvData.shift(); // Remove header row
// console.log(csvData);
var pairsDict = {};
csvData.forEach(row => {
    items = row.split(",");
    items.shift(); // remove the s. number column from the list
    // console.log(items);
    for(var i=0;i<items.length;i++){
        for(var j=i+1;j<items.length;j++){
            dish1name=items[i].toLowerCase();
            dish2name=items[j].toLowerCase();
            if(menuData[`${dish1name.trim()}`] != undefined){
                dish1id = menuData[`${dish1name.trim()}`].id;
            }else{
                dish1id = 0;
            }
            if(menuData[`${dish2name.trim()}`] != undefined){
                dish2id = menuData[`${dish2name.trim()}`].id;
            }else{
                dish2id = 0;
            }
            // push dish1 and dish2 id
            if(dish1id<dish2id){
                if(pairsDict[dish1id+"-"+dish2id]==undefined){
                    pairsDict[dish1id+"-"+dish2id]={weight:1}
                }else{
                    updatedCount = pairsDict[dish1id+"-"+dish2id].weight;
                    updatedCount++;
                    pairsDict[dish1id+"-"+dish2id]= {weight:updatedCount};
                }
            }else{
                if(pairsDict[dish2id+"-"+dish1id]==undefined){
                    pairsDict[dish2id+"-"+dish1id]={weight:1}
                }else{
                    updatedCount = pairsDict[dish2id+"-"+dish1id].weight;
                    updatedCount++;
                    pairsDict[dish2id+"-"+dish1id]= {weight:updatedCount};
                }
            }
        }
    }
});
// console.log("Pairs: ",pairsDict);
const outputData = [['source', 'target', 'weight']];

Object.entries(pairsDict).forEach(([pair, { weight }]) => {
    const [source, target] = pair.split('-').map(Number);  // Split the key and convert to numbers
    outputData.push([source, target, weight]);  // Push the result in desired format
  });
const outputCsvContent = outputData.map(row => row.join(',')).join('\n');
fs.writeFileSync(outputCsvPath, outputCsvContent);
console.log(`CSV file with source, target, and weight has been saved as '${outputCsvPath}'.`);
