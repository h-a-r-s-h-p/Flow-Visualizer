import React, { Component } from 'react'
import "./VisualPage.css"
import PlotGraph from '../PlotGraph/PlotGraph';
import GraphInput from '../GraphInput/GraphInput';
import EdmondsKarpPseudo from '../PseudoCode/EdmondsKarpPseudo';
import HandleActions from '../Actions/HandleActions'

export default class EdmondsKarp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vertexCount: null,
      edgeCount: null,
      startingVertices: null,
      endingVertices: null,
      weights: null,
      source: null,
      sink: null,
      isClicked: false
    };
    console.log("inside constructor\n");

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(vertexCount, edgeCount, startingVertices, endingVertices, weights, source, sink, isClicked) {
    this.setState(prevState => {
      return {
        vertexCount: vertexCount,
        edgeCount: edgeCount,
        startingVertices: startingVertices,
        endingVertices: endingVertices,
        weights: weights,
        source: source,
        sink: sink,
        isClicked: isClicked
      }
    })
  }

  render() {
    return (
      <>
        <h1>{this.props.algorithm}</h1>
        <GraphInput func={this.handleChange} />
        <div className="container">
          <div className="visual">
            {(() => {
                if (this.state.isClicked){
                    return (
                      <div>
                        <PlotGraph graph = {this.state}/>  
                        <div className="control-bar">
                          <button className="buttonstart"  onClick={HandleActions(this.state.vertexCount, 
                                                                                  this.state.edgeCount, 
                                                                                  this.state.startingVertices, 
                                                                                  this.state.endingVertices,
                                                                                  this.state.weights,
                                                                                  this.state.source,
                                                                                  this.state.sink)} >Start Visualization</button><br />
                          <button className="buttonresume" >Resume</button>
                          <button className="buttonpause" >Pause</button>
                          <button className="buttonreset" >Reset</button>
                        </div>
                        
                      </div>
                    )
                }
                
                return null;
              })()}
          </div>

          <div className="pseudocode">
            {this.state.isClicked? <EdmondsKarpPseudo /> :''}
          </div>

        </div>
      </>
    );
  }
}