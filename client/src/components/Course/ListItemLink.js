import { ListItemText } from "@material-ui/core";

function ListItemLink(props){
    const {to, text, inset} = props;
    const [redirect, setRedirect] = useState('');
    if(redirect !== ''){
      return(<Redirect to={redirect}/>)
    }
    return(
        <ListItem button onClick={(setRedirect(to))}>
            <ListItemText inset={inset}>
                {text}
            </ListItemText>
        </ListItem>
    )
}