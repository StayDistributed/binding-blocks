Let's play with Github APIs, this is the `binding-blocks` URL:<br />
<a href="https://api.github.com/repos/StayDistributed/binding-blocks" target="_blank">api.github.com/repos/StayDistributed/binding-blocks</a>

The following view is binded to the JSON response of that endpoint:

```jsx
import fetch from './utils/ajax';
import { Binding, With, Value, Log } from 'binding-blocks';

const APIWrapper = () => {
  const [state, setState] = React.useState();

  const fetchData = () => {
    setState('loading');
    fetch('https://api.github.com/repos/StayDistributed/binding-blocks')
      .then(response => response.json())
      .then(response => setState(response))
  };

  if (!state) return (
    <button class="btn btn-primary" onClick={fetchData}>Fetch Data</button>
  );

  if (state === 'loading') return (
    <button class="btn btn-secondary">Loading...</button>
  );

  return (
    <Binding data={state}>
      <h2><Value name="name" /></h2>
      <p><Value name="description" /></p>
      <pre>git clone <Value name="git_url" /></pre>

      <hr />

      {/* Here's the most declarative mode: */}
      <With name="organization">
        <table class="table table-borderless">
          <tr>
            <td>html_url</td>
            <td><Value name="html_url" /></td>
          </tr>
          <tr>
            <td>followers_url</td>
            <td><Value name="followers_url" /></td>
          </tr>
          <tr>
            <td>repos_url</td>
            <td><Value name="repos_url" /></td>
          </tr>
        </table>
      </With>

      <hr />

      {/* Here's the "render prop" mode, to more advanced usages: */}
      <With name="owner">
        {store => {
          const owner = store.toJSON();
          return (
            <div class="d-flex align-items-center">
              <div class="mr-2">
                <span>Organization:</span><br />
                <a href={owner.html_url}>{owner.login}</a>
              </div>
              <img src={owner.avatar_url} width={50} />
            </div>
          );
        }}
      </With>

    </Binding>
  );
};

<APIWrapper></APIWrapper>
```