import {Link} from 'react-router-dom';
import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem,Row, Col, Button, Modal, ModalHeader, ModalBody, Label} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';

function RenderDish({dish}) {
	return(
		<Card className="col-md-5">
			<CardImg width="100%" src={dish.image} alt={dish.name}/>
			<CardBody>
				<CardTitle>{dish.name}</CardTitle>
				<CardText>{dish.description}</CardText>
			</CardBody>
		</Card>
	);
}

function RenderComments({comments, addComment, dishId}) {
	const comment = comments.map((comment) => {
					//var date =  new Date(comment.date).toDateString();
						return(<span key={comment.id} className="m-10">
								<p>{comment.comment}</p>
								<p>--{comment.author} ,  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
							</span>
						);
		});
	comment.push(<CommentForm key="comment-form" dishId={dishId} addComment={addComment}/>);
	return comment ;
}

const DishDetail = (props) => {
	const dish = props.dish;
	const comments  = props.comments
	if(props.isLoading) {
		return(<div className="container">
			<div className="row">
				<Loading />
			</div>
		</div>);
	}
	else if(props.errMsg) {
		return(<div className="container">
			<div className="row">
				<h4>props.errMsg</h4>
			</div>
		</div>);
	}
	else if(dish !== null && dish != undefined) {
		return(
			<div className="container">

				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
						<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3> {props.dish.name}</h3>
						<hr />
					</div>
				</div>
				<div className="row">
						<RenderDish dish= {dish}/>
					<Card className="col-md-5">
						<CardBody>
							<CardTitle>Comments</CardTitle>
							<RenderComments comments = {comments} addComment= {props.addComment} dishId = {props.dish.id}/>
						</CardBody>
					</Card>
				</div>
			</div>
		);
	}else {
		return(<div></div>);
	}
}

const maxLength  = (len) => (val) => !(val) || (val.length <=len);
const minLength  = (len) => (val) => (val) && (val.length >=len);

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isCommentFormOpen:false

		}
		this.toggleForm = this.toggleForm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(values) {
		this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
	}
	toggleForm() {
		this.setState({
			isCommentFormOpen: !this.state.isCommentFormOpen
		})
	}

	render() {
		return(
		<React.Fragment>
			 <Modal isOpen= {this.state.isCommentFormOpen} >
		        	<ModalHeader >Submit Comment</ModalHeader>
			        	<ModalBody>
			        		<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
	                            <Row className="form-group">
	                                <Label htmlFor="rating" md={12}>Rating </Label>
	                                <Col md={12}>
	                                	<Control.select model=".rating" className="form-control" >
	                                        <option> 1</option>
	                                        <option>2 </option>
	                                        <option> 3</option>
	                                        <option>4 </option>
	                                        <option> 5</option>
	                                    </Control.select>
	                                </Col>
	                            </Row>
	                            <Row className="form-group">
	                                <Label htmlFor="author" md={12}>Your Name </Label>
	                                <Col md={12}>
	                                    <Control.text model=".author" className="form-control" 
	                                    validators={{ 
                                    		minLength: minLength(3), 
                                    		maxLength:maxLength(15)
                                		}}/>
	                                    <Errors 
	                                    	className="text-danger"
	                                    	model=".author" 
	                                    	show="touched"         
	                                    	messages= {{
		                                    	minLength:'Must be greather than 2 char',
		                                    	maxLength:'Must be l15 charcters or less'
	                                   		}} 
                                   		/>
	                                </Col>
	                            </Row>
	                            
	                              <Row className="form-group">
	                                <Label htmlFor="comment" md={12}>Comment </Label>
	                                <Col md={12}>
	                                    <Control.textarea model=".comment" className="form-control" id="comment"  name="comment" rows="6"/>
	                                </Col>
	                            </Row>

	                            <Row className="form-group">
	                                <Col md={{size:12}}>
	                                    <Button type="submit" color="primary">Submit </Button>
	                                </Col>
	                            </Row>

	                        </LocalForm>
			        	</ModalBody>
			        </Modal>
	    	 <Button outline onClick={this.toggleForm}>
				<span className="fa fa-edit fa-lg"></span>Submit Comment
			 </Button>
		</React.Fragment>
		);
	}
}

export default DishDetail;