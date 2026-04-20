import Types "../types/inquiry";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Time "mo:core/Time";

module {
  public type Inquiry = Types.Inquiry;

  public func create(
    counter : Nat,
    name : Text,
    email : Text,
    projectType : Text,
    budget : Text,
    deadline : Text,
    description : Text,
  ) : Inquiry {
    let id = "INQ-" # counter.toText();
    {
      id;
      name;
      email;
      projectType;
      budget;
      deadline;
      description;
      submittedAt = Time.now();
    };
  };

  public func toArray(inquiries : List.List<Inquiry>) : [Inquiry] {
    inquiries.toArray();
  };
};
