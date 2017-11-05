var audioContext = new AudioContext();

var RenderOscillators = React.createClass({

    startOscPlaying: function(id) {
        var osc = this.props.entries;

        osc.forEach(function(val, index) {
            if (val.id === id) {
                val.osc.connect(audioContext.destination);
                val.osc.frequency.value = val.freq;
                val.osc.start(audioContext.currentTime)
            }
        });
    },

    stopOscPlaying: function(id) {
        var osc = this.props.entries;

        osc.forEach(function(val, index) {
            if (val.id === id) {

                val.osc.stop(audioContext.currentTime);
                val.osc = audioContext.createOscillator();

            }
        });
    },

    render: function() {


        var oscillatorCircles = this.props.entries.map((item) => {

            const oscCircle = {
                backgroundColor: item.circleColor,
                borderStyle: "solid",
                borderRadius: "50%",
                width: "100",
                height: "100",
                listStyleType: "none"

            }

            return <li  key={item.id} style={oscCircle} 
                onMouseDown = {() => this.startOscPlaying(item.id)}
                onMouseUp = {() => this.stopOscPlaying(item.id)}>
               <span className="circle-freq-text"> {item.freq + " hz"}</span>
                </li>
        });


        return (

            <ul className="oscCircle" >
                {oscillatorCircles}
            </ul>
        );
    }

});


var AppContainer = React.createClass({

    getInitialState: function() {
        return {
            oscillatorList: [{
                osc: audioContext.createOscillator(),
                freq: 200,
                id: "1",
                circleColor: "orange"
            }]
        };
    },

    makeOscillator: function(e) {
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

        this.frequency.value = "";


    },


    render: function() {

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
            the oscillator play </p>
            <div id="main-container">
        
            <RenderOscillators entries={this.state.oscillatorList} />
            </div>
            </section>
        )
    }
})


ReactDOM.render(
    <div>
      <AppContainer/>
    </div>,
    document.getElementById('root')
)



// NOTES ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// How to Convert to ES6 classes --->  https://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes

/*___________________BEGIN how to work with state

In react you DO NOT push data to any array of YOUR choosing to save state. 
Instead, you MUST use a method named getInitialState, It looks like this:

getInitialState: function() {
        return {
            ListOfStuff: [{
                prop1:"stuff",
                prop2:"more stuff"
            }]
        };
    },

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
