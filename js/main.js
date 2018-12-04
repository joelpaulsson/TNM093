queue()
  .defer(d3.csv,'data/data.csv')
  .defer(d3.json,'maps/world-topo.json')
  .await(draw);

var sp, map;

function draw(error, data, world_map_json){
  if (error) throw error;

  sp = new sp(data);
  map = new map(data, world_map_json);

}
