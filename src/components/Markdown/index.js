import React from 'react';

import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import ReactMarkdown from 'react-markdown';

import Prettylink from '../Prettylink';


const styles = theme => ({
  code: {
    borderColor: theme.palette.divider,
    borderRadius: 2,
    borderStyle: 'solid',
    borderWidth: 1,
    overflowY: 'auto',
    padding: theme.spacing.unit,
  },
  table: {overflowX: 'auto'},
});


class Markdown extends React.PureComponent {

  state = {content: null};

  componentDidMount() {
    this.update();
  }

  componentDidUpdate(props) {
    if (props.match && this.props.match && props.match.url !== this.props.match.url) {
      this.update();
    }
  }

  update() {
    const path = this.props.source || ((
      this.props.match
        ? [this.props.match.url.split('/')[1]].concat(Object.values(this.props.match.params))
        : []
    ).join('/') + '.md');
    try {
      const resource = require('../../pages/' + path);
      axios(resource).then(response => this.setState({content: response.data}));
    }
    catch (e) {
      console.error(`Could not find document at '${path}'`);
    }
  }

  render() {

    const { className, classes } = this.props;
    const { content } = this.state;

    const renderers = {
      code: props => <pre className={classes.code}><code>{props.value}</code></pre>,
      heading: props => <Typography children={props.children} gutterBottom variant={`h${props.level}`} />,
      link: Prettylink,
      linkReference: Prettylink,
      table: props => <Table children={props.children} />,
      tableHead: props => <TableHead children={props.children} />,
      tableBody: props => <TableBody children={props.children} />,
      tableRow: props => <TableRow children={props.children} />,
      tableCell: props => <TableCell children={props.children} padding="checkbox" />,
      thematicBreak: Divider,
    };

    return content ? (
      <Typography className={className} component={ReactMarkdown} renderers={renderers} source={content} />
    ) : null;
  }
}


export default withStyles(styles)(Markdown);