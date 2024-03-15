type VoteType = {
  id: string;
  rank: number;
}

export type VotesType = {
  id: string;
  vote: VoteType[];
}[]

export const renderResult = (votes: VotesType) => {
  if (!votes) {
    return []
  }
  const result = votes.reduce((acc: { name: string; points: number; }[], cur) => {
    const testPoints = cur.vote.map((vote: { id: string; }, index: number) => {
      return {
        name: vote.id,
        points: cur.vote.length - index
      }
    })
    if (acc?.length === 0) {
      return testPoints;
    }
    const newAcc = acc.map((accVote: { points: number; name: string; }) => {
      return {
        ...accVote,
        points: accVote.points + (testPoints.find((testPoint: { name: any; }) => testPoint.name === accVote.name)?.points || 0)
      }
    })
    return newAcc
  }, [])
  return result?.sort((a: { points: number; }, b: { points: number; }) => b.points - a.points)
}