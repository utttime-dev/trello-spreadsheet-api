function main() {
  var card_infos = getCardInfos();
  var contributions = {};
  for (let i =0; i < card_infos.length; i++) {
    let card  = new Card(card_infos[i].id, card_infos[i].idMembers, card_infos[i].idLabels, card_infos[i].shortUrl)
    for(let j = 0; j < card.contributors.length; j++) {
      let contributor = card.contributors[j]
      if(!contributor) {
        continue;
      }
      if( contributions[contributor]) {
        contributions[contributor]['payment'] += card.price;
        contributions[contributor]['card_total'] += 1;
        contributions[contributor]['card_urls'].push(card.shortUrl);
        continue;
      }
      contributions[contributor] = {'payment': card.price, 'card_total': 1, 'card_urls': [card.shortUrl]};
    }
  }
  Logger.log(contributions);
  saveContributions(contributions);
}


function saveContributions(contributions) {
  if(!contributions) {
    Logger.log('Set Contributions');
    return false;
  }

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSheet();

  sheet.getRange('A2:D9').clear({ contentsOnly: true });

  var keys = Object.keys(contributions);
  for ( let i = 0; i < keys.length; i ++ ) {
    let name = keys[i]
    let row = [[name, contributions[name]['payment'], contributions[name]['card_total'], contributions[name]['card_urls'].join(String.fromCharCode(10)) ]]
    sheet.getRange(`A${i+2}:D${i+2}`).setValues(row);
  }
}
