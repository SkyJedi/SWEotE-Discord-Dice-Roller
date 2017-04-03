//function for rolling a d100 and using a modifier
exports.d100 = function d100(str, message) {
  var total = 0;
  //no modifier
  if (str.length < 1) {
    console.log("No modifier, straight d100 roll");
      let r = Math.floor(Math.random() * 100) + 1;
      total = +r;
      message.channel.sendMessage(message.author.username + " rolled: " + total);
  //addition modifier
  } else if (str.includes("+") || str[0][0] == "+") {
		console.log("+ modifier detected");
        var modifier = (str[str.length - 1]).replace(/\D/g, "");
        let r = Math.floor(Math.random() * 100) + 1;
        total = +r + +modifier;
        message.channel.sendMessage(message.author.username + " rolled: " + r + " + " + modifier + " " + "for a total of " + total);
	//subtraction modifier
} else if (str.includes("-") ||str[0][0] == "-") {
    	console.log("- modifier detected");
        var modifier = (str[str.length - 1]).replace(/\D/g, "");
        let r = Math.floor(Math.random() * 100) + 1;
        total = +r - +modifier;
        message.channel.sendMessage(message.author.username + " rolled: " + r + " - " + modifier + " " + "for a total of " + total);
    }
    return (total);
}
