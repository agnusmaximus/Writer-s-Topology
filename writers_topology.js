BASE_SIZE = 1
turn = 1
last_node = new Object();
root_node = new Object();

/* Graph data abstraction */
graph = new Object();
myFlower = null;

//Gets a node with given name, otherwise returns null
function get_node(name) {
    if (graph.hasOwnProperty(name)) 
	return graph[name];
    else
	return null;
}

//Creates a node with given name and size
function create_node(name, size) {
    if (get_node(name) != null) {
	console.log("Error: creating node that already exists");
	return;
    }

    new_object = new Object()
    new_object["name"] = name;
    new_object["size"] = size;
    graph[name] = new_object;

    return new_object;
}

//Add a child to the given node named "map"
function add_child(map, value){
    if (!map.hasOwnProperty("children"))
	map["children"] = new Array();
    map["children"].push(value);
    return map;
}

//Gets all children from given node
function get_children(map){
    if (!map.hasOwnProperty("children"))
	return new Array();
    return map["children"];
}

//Visualizes graph data
function visualize_graph(data) {
    if (myFlower == null)
	myFlower = new CodeFlower("#topological_graph", 450, 450);
    myFlower.update(data);
}

/* End graph data abstraction */

/* Method: clean_text
 * -----------------------------
 * Cleans text by lowercasing all characters 
 * and removing punctuation
 *
 * @text - the text to clean
 * @return - cleaned text without punctuation -- all lowercase
 */
function clean_text(text) {
    result_text = text.replace(/[?@\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    return result_text.toLowerCase();
}

/* Method: topologize_text
 * -----------------------------
 * Generates a directed graph from the text, 
 * where each node is a word, and each edge
 * leads to a subsequent word.
 */

function topologize_text() {
    
    //Increment user's turn
    window.turn += 1;

    //Get text from input and clean it
    console.log("Topologizing...")
    text = clean_text($("#writing").val());

    //Don't do anything with empty strings
    if (text == "") return;

    //Split text into tokens
    tokens = text.split(" ")

    //Create the first node
    if (window.turn == 2) {
	root_node = create_node(tokens[0], 1);
	last_node = root_node;
    }
    
    console.log(graph);
    console.log(last_node);

    //Average string length
    max_length = -1
    min_length = 1000
    avg_length = 1
    
    for (i = 1; i < Math.min(900, tokens.length); i++) {
	avg_length += tokens[i].length;
	max_length = Math.max(max_length, tokens[i].length);
	min_length = Math.min(min_length, tokens[i].length);

	tokens[i] = tokens[i].replace(/^\s+|\s+$/g,'');
	if (tokens[i] == "") continue;
	
	//Get the node and ndoe to create connection
	node = get_node(tokens[i]);
	node_to_connect = last_node;

	//If node already exists, increase its size
	if (node != null) {
	    node.size += BASE_SIZE;
	}
	//otherwise, create the node and make a connection
	else {
	    node = create_node(tokens[i], BASE_SIZE);
	    add_child(node_to_connect, node);
	}
	last_node = node;
    }

    last_node = root_node;
    
    //Visualize the graph
    visualize_graph(root_node);

    //Compute average length and alter graph edge
    //color based on text length
    avg_length /= Math.min(900, tokens.length);
    r = 12 * min_length
    g = 10 * max_length
    b = 80 * avg_length
    
    $(".link").css("stroke", "rgb(" + parseInt(r) + ", " + parseInt(g) + ", " + parseInt(b) + ")");
}
