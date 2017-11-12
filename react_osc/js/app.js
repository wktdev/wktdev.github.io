var audioContext = new AudioContext();

class RenderOscillators extends React.Component {
    constructor(props){
        super(props)
        this.startOscPlaying = this.startOscPlaying.bind(this);
        this.stopOscPlaying = this.stopOscPlaying.bind(this);
    }

    startOscPlaying(id) {
        var osc = this.props.entries;

        osc.forEach(function(val, index) {
            if (val.id === id) {
                val.osc.connect(audioContext.destination);
                val.osc.frequency.value = val.freq;
                val.osc.start(audioContext.currentTime)
            }
        });
    }

    stopOscPlaying(id) {
        var osc = this.props.entries;

        osc.forEach(function(val, index) {
            if (val.id === id) {

                val.osc.stop(audioContext.currentTime);
                val.osc = audioContext.createOscillator();

            }
        });
    }

    render() {


        var oscillatorCircles = this.props.entries.map((item) => {

            const oscCircle = {
                backgroundColor: item.circleColor,
                borderStyle: "solid",
                borderRadius: "50%",
                width: "100",
                height: "100",
                listStyleType: "none"

            }

            const container = {
                display:"inline-block"
            }

            return <div  key={item.id} style={container}> 
                <li style={oscCircle}  onMouseDown = {() => this.startOscPlaying(item.id)}
                onMouseUp = {() => this.stopOscPlaying(item.id)}>
               <div className="circle-freq-text"> 
               <p>{item.freq + " hz"}</p>
               </div>
               </li>
               <div className = "delete-osc" onClick = {()=>{this.props.deleteOscillator(event,item.id)}}>X</div>
                </div>
        });


        return (

            <ul className="oscCircle" >
                {oscillatorCircles}
            </ul>
        );
    }

};


class AppContainer extends React.Component {

    constructor(props){
        super(props)
        this.state = { 
     
            oscillatorList: [{
                osc: audioContext.createOscillator(),
                freq: 200,
                id: "1",
                circleColor: "orange"
            }]
        }

        this.makeOscillator = this.makeOscillator.bind(this);
        this.deleteOscillator= this.deleteOscillator.bind(this);

        
    }
        


    makeOscillator(e) {
        e.preventDefault();
        var oscArray = this.state.oscillatorList;
        console.log(this.circleColor.value);
        oscArray.push({
            osc: audioContext.createOscillator(),
            freq: this.frequency.value || 300,
            id: Date.now(),
            circleColor: this.circleColor.value
        });

        this.setState({
            oscillatorList: oscArray
        });

        this.frequency.value = "300";


    }

    deleteOscillator(event, id){
        console.log(event);
         event.stopPropagation();

        var tempOscList = this.state.oscillatorList;

       var updateOscList = tempOscList.filter(function(val,index,array){
            if(val.id !== id){
                return val
            }

        });

         this.setState({
            oscillatorList: updateOscList
        });



    }
 


    render() {

        return (
            <section >
      
             <nav>
            <form onSubmit = {this.makeOscillator}>
            <input type = "number" ref={(value) => this.frequency = value} defaultValue="300"/>
              <select name="oscColor" ref={(value) => this.circleColor = value}>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="orange">Orange</option>
                  <option value="purple">Purple</option>
              </select>
            <input type = "submit"/>
        
            </form>
            </nav>
                <p id="instructions">Type a frequency, select a color and then click submit. Click the circles that appear to hear 
            the oscillator play. Click the small circle to delete it </p>
            <div id="main-container">
        
            <RenderOscillators entries={this.state.oscillatorList} deleteOscillator={this.deleteOscillator} />
            </div>
            </section>
        )
    }
}


ReactDOM.render(
    <div>
      <AppContainer/>
    </div>,
    document.getElementById('root')
)



// NOTES ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

/*___________________BEGIN how to work with state

In react you DO NOT push data to any array of YOUR choosing to save state. 
Instead, you MUST use a property named state, It looks like this:

  this.state = {
        return {
            ListOfStuff: [{
                prop1:"stuff",
                prop2:"more stuff"
            }]
        };
    },


// Get state:

    this.setState({
        oscillatorList: []
    });

You CAN and SHOULD set arrays as property values of the object that getInitialState returns.You always store
list items in this way.


_________________________

How to Capture Form Input

To capture form input you MUST use an attribute called "ref". In the line of code below "this.frequency"
is available inside the component as: this.frequency.value


<input type = "number" ref={(data) => this.frequency = data} defaultValue="300"/>



In the line above the argument "data" can be named anything. The name is irrelevent. 





_____________________END how to work with state * / 





/*___________________BEGIN how to pass argument to event listener functions


If you want to pass arguments to an event listener
you have to do it via a callback like this:

<div onClick = {() => this.playOsc("1")}> CLICK ME </div>


_____________________END how to pass argument to event listener functions__*/



/*___________________BEGIN how to input data to HTML components


It helps to always look at HTML components as functions. In other words, treat the following as an invoked function:

<myFunc/>

To input arguments to it from it's parent component attributes via state.

<myFunc entries = {this.state.somePropertyOfParent} />

The internals of the <myFunc/> component will then be available via "this.props.nameOfAttribute":

var myFunc = React.createClass({
    this.props.entries // this contains the data that was passed in via this.statesomePropertyOfParent
})

_____________________END how to input data to HTML components   ____*/